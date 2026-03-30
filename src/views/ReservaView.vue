<template>
  <div>
    <div class="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14">

        <!-- Header -->
        <div class="mb-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <!-- Botão Voltar -->
            <button
              @click="voltarHome"
              class="group inline-flex items-center self-start px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-300 rounded-xl shadow-sm transition-all duration-200 font-medium text-sm min-h-[40px]"
            >
              <ArrowLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Voltar ao Início
            </button>

            <!-- Badge -->
            <div class="inline-flex items-center self-start bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-red-200 whitespace-nowrap">
              Nova Reserva
            </div>
          </div>

          <!-- Título -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-md mb-3">
              <CalendarIcon class="w-5 h-5 text-white" />
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
              Nova <span class="text-red-600">Reserva</span>
            </h1>
            <p class="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
              Preencha os dados abaixo para agendar sua sala
            </p>
          </div>
        </div>

        <!-- Formulário Principal -->
        <form
          @submit.prevent="handleSubmit"
          class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <!-- Header do Form -->
          <div class="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-5 py-4">
            <div class="flex items-center">
              <div class="bg-white/20 p-2 rounded-lg mr-3">
                <PlusIcon class="w-4 h-4" />
              </div>
              <div>
                <h2 class="text-base font-bold">Informações da Reserva</h2>
                <p class="text-red-200 text-xs">Campos com * são obrigatórios</p>
              </div>
            </div>
          </div>

          <div class="p-5 sm:p-8 space-y-8">

            <!-- Seção 1: Informações Pessoais -->
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="bg-red-100 p-2 rounded-lg mr-2">
                  <UserIcon class="w-4 h-4 text-red-600" />
                </div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Informações Pessoais</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nome do Responsável -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Nome do Responsável *</label>
                  <div class="relative">
                    <input
                      v-model="formData.responsibleName"
                      type="text"
                      required
                      placeholder="Digite seu nome completo"
                      class="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 text-gray-900 text-sm"
                    />
                    <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <!-- Título da Reserva -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Título da Reserva *</label>
                  <div class="relative">
                    <input
                      v-model="formData.title"
                      type="text"
                      required
                      placeholder="Ex: Reunião de Consumo"
                      class="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 text-gray-900 text-sm"
                    />
                    <FileTextIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Seção 2: Local e Data -->
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="bg-red-100 p-2 rounded-lg mr-2">
                  <MapPinIcon class="w-4 h-4 text-red-600" />
                </div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Local e Data</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Sala -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Selecione a Sala *</label>
                  <Listbox v-model="formData.rooms">
                    <div class="relative">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-8 text-left text-sm shadow-sm focus:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all duration-200"
                      >
                        <TagIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <span class="block truncate text-gray-900">{{ selectedRooms }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDownIcon class="h-4 w-4 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <ListboxOption v-for="type in rooms" :key="type" :value="type" v-slot="{ active, selected }">
                            <li :class="[active ? 'bg-red-100 text-red-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4']">
                              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ type }}</span>
                              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                <CheckIcon class="h-4 w-4" />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </div>

                <!-- Data -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Data da Reserva *</label>
                  <div class="relative">
                    <input
                      v-model="formData.date"
                      type="date"
                      required
                      :min="minDate"
                      class="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 text-gray-900 text-sm"
                    />
                    <CalendarIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Seção 3: Horários -->
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="bg-red-100 p-2 rounded-lg mr-2">
                  <ClockIcon class="w-4 h-4 text-red-600" />
                </div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Horários</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Horário de Início -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Horário de Início *</label>
                  <div class="relative">
                    <input
                      v-model="formData.start"
                      type="time"
                      required
                      class="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 text-gray-900 text-sm"
                    />
                    <ClockIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <!-- Horário de Fim -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Horário de Fim *</label>
                  <div class="relative">
                    <input
                      v-model="formData.end"
                      type="time"
                      required
                      class="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 text-gray-900 text-sm"
                    />
                    <ClockIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Seção 4: Detalhes do Evento -->
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="bg-red-100 p-2 rounded-lg mr-2">
                  <UsersIcon class="w-4 h-4 text-red-600" />
                </div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Detalhes do Evento</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Tipo de Evento -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Tipo de Evento/Atividade</label>
                  <Listbox v-model="formData.eventType">
                    <div class="relative">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-8 text-left text-sm shadow-sm focus:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all duration-200"
                      >
                        <TagIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <span class="block truncate text-gray-900">{{ selectedEventType }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDownIcon class="h-4 w-4 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <ListboxOption v-for="type in eventTypes" :key="type" :value="type" v-slot="{ active, selected }">
                            <li :class="[active ? 'bg-red-100 text-red-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4']">
                              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ type }}</span>
                              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                <CheckIcon class="h-4 w-4" />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </div>

                <!-- Tipo de Participantes -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Tipo de Participantes</label>
                  <Listbox v-model="formData.participants">
                    <div class="relative">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-8 text-left text-sm shadow-sm focus:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all duration-200"
                      >
                        <TagIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <span class="block truncate text-gray-900">{{ selectedParticipants }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDownIcon class="h-4 w-4 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <ListboxOption v-for="type in participantTypes" :key="type" :value="type" v-slot="{ active, selected }">
                            <li :class="[active ? 'bg-red-100 text-red-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4']">
                              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ type }}</span>
                              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                <CheckIcon class="h-4 w-4" />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </div>

                <!-- Número de Participantes -->
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Número de Participantes *</label>
                  <div class="relative">
                    <input
                      v-model="formData.participantCount"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="Ex: 10 pessoas"
                      class="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 text-gray-900 text-sm"
                    />
                    <HashIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <!-- Coffee Break -->
                <v-card elevation="0" class="border border-gray-200 rounded-xl">
                  <v-card-title class="flex items-center gap-2 text-sm font-medium text-gray-700 pb-0">
                    <CoffeeIcon class="w-4 h-4 text-red-600" />
                    Serviço de Coffee Break
                  </v-card-title>

                  <v-card-text>
                    <div class="flex items-center space-x-2 -mb-1">
                      <v-checkbox
                        v-model="formData.needsCoffee"
                        label="Solicitar Coffee Break"
                        @change="toggleCoffeeBreak"
                        hide-details
                        color="red"
                      ></v-checkbox>
                      <span
                        v-if="formData.needsCoffee"
                        class="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"
                      >
                        <CoffeeIcon class="w-3 h-3" />
                        Solicitado
                      </span>
                    </div>

                    <v-expand-transition>
                      <div v-if="formData.needsCoffee && coffeeBreakExpanded" class="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <v-select
                              v-model="formData.coffee.type"
                              :items="servicosCafe"
                              item-title="text"
                              item-value="value"
                              label="Tipo de Serviço *"
                              :required="formData.needsCoffee"
                              placeholder="Selecione o tipo"
                              hide-details
                            ></v-select>
                          </div>
                        </div>
                        <div>
                          <v-textarea
                            v-model="formData.coffee.observation"
                            label="Observações"
                            placeholder="Ex: sem açúcar, incluir chá, água gelada, restrições alimentares..."
                            hide-details
                          />
                        </div>
                      </div>
                    </v-expand-transition>
                  </v-card-text>
                </v-card>
              </div>
            </div>

            <!-- Seção 5: Observações -->
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="bg-red-100 p-2 rounded-lg mr-2">
                  <MessageSquareIcon class="w-4 h-4 text-red-600" />
                </div>
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Observações</h3>
              </div>

              <div class="relative">
                <textarea
                  v-model="formData.notes"
                  rows="4"
                  placeholder="Digite aqui observações, instruções especiais ou requisitos adicionais para a reserva..."
                  class="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none resize-none transition-all duration-200 text-gray-900 text-sm"
                ></textarea>
                <MessageSquareIcon class="absolute left-3 top-4 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                @click="voltarHome"
                class="flex-1 group px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-xl font-medium transition-all duration-200 flex items-center justify-center border border-gray-200 hover:border-gray-300 text-sm"
              >
                <ArrowLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Cancelar
              </button>

              <button
                type="submit"
                :disabled="!isFormValid || !!conflictMessage"
                :class="submitButtonClass"
              >
                <CheckIcon class="w-4 h-4 mr-2" />
                {{ !isFormValid ? 'Preencha os campos obrigatórios' : 'Confirmar Reserva' }}
              </button>
            </div>
          </div>

          <!-- Modal de Sucesso -->
          <transition name="modal-fade">
            <div
              v-if="showSuccessModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <div class="relative w-full max-w-md">
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-center">
                    <div class="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3">
                      <CheckIcon class="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 class="text-xl font-bold text-white">Sucesso!</h3>
                  </div>
                  <div class="p-6 text-center">
                    <p class="text-gray-600 text-base mb-5">Reserva criada com sucesso!</p>
                    <button
                      @click="closeSuccessModal"
                      class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors duration-200 text-sm"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Modal de Erro -->
          <transition name="modal-fade">
            <div
              v-if="showErrorModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <div class="relative w-full max-w-md">
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div class="bg-gradient-to-r from-rose-500 to-rose-600 p-6 text-center">
                    <div class="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3">
                      <AlertTriangleIcon class="w-7 h-7 text-rose-600" />
                    </div>
                    <h3 class="text-xl font-bold text-white">Atenção!</h3>
                  </div>
                  <div class="p-6 text-center">
                    <p class="text-gray-600 text-base mb-5">{{ errorMessage }}</p>
                    <button
                      @click="closeErrorModal"
                      class="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors duration-200 text-sm"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Modal de Conflito -->
          <transition name="modal-fade">
            <div
              v-if="showConflictModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <div class="relative w-full max-w-lg">
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div class="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                    <div class="flex items-center">
                      <div class="bg-white/20 p-2.5 rounded-lg mr-4">
                        <AlertTriangleIcon class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 class="text-lg font-bold text-white">Conflito de Horário</h3>
                        <p class="text-amber-100 text-sm">Esta sala já está reservada</p>
                      </div>
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                      <p class="text-gray-700 text-sm leading-relaxed">{{ conflictMessage }}</p>
                    </div>
                    <button
                      @click="closeConflictModal"
                      class="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors duration-200 text-sm"
                    >
                      Escolher Outro Horário
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Toast -->
          <transition name="slide-fade">
            <div v-if="showToast" class="fixed top-4 right-4 z-50 max-w-md">
              <div
                class="bg-white rounded-2xl shadow-2xl border-l-4 overflow-hidden"
                :class="toastType === 'success' ? 'border-emerald-500' : 'border-rose-500'"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0 mr-3">
                    <div
                      class="w-9 h-9 rounded-full flex items-center justify-center"
                      :class="toastType === 'success' ? 'bg-emerald-100' : 'bg-rose-100'"
                    >
                      <CheckIcon v-if="toastType === 'success'" class="w-4 h-4 text-emerald-600" />
                      <AlertTriangleIcon v-else class="w-4 h-4 text-rose-600" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 text-sm">{{ toastMessage }}</p>
                  </div>
                  <button @click="closeToast" class="ml-3 text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div class="h-1 bg-gray-100">
                  <div
                    class="h-full transition-all duration-300 ease-linear"
                    :class="toastType === 'success' ? 'bg-emerald-500' : 'bg-rose-500'"
                    :style="{ width: toastProgress + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { useRouter } from "vue-router";
import {
  Coffee as CoffeeIcon,
  Plus as PlusIcon,
  ArrowLeft as ArrowLeftIcon,
  AlertTriangle as AlertTriangleIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users as UsersIcon,
  MapPin as MapPinIcon,
  FileText as FileTextIcon,
  Building as BuildingIcon,
  ChevronDown as ChevronDownIcon,
  Tag as TagIcon,
  Hash as HashIcon,
  MessageSquare as MessageSquareIcon,
  Check as CheckIcon,
} from "lucide-vue-next";

const router = useRouter();

const voltarHome = () => {
  router.push("/");
};

// Estados do formulário
const coffeeBreakRequested = ref(false);
const coffeeBreakExpanded = ref(false);

const emit = defineEmits(["voltar-home", "reserva-criada"]);

const servicosCafe = ref([
  { text: "Café Simples", value: "cafe-simples" },
  { text: "Lanche", value: "lanche" },
  { text: "Completo", value: "completo" },
  { text: "Personalizado", value: "personalizado" },
]);

const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const showConflictModal = ref(false);
const errorMessage = ref("");

// Estados do toast
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");
const toastProgress = ref(100);
let toastTimer = null;

// Funções dos modais
const closeSuccessModal = () => {
  showSuccessModal.value = false;
  voltarHome();
};

const closeErrorModal = () => {
  showErrorModal.value = false;
};

const closeConflictModal = () => {
  showConflictModal.value = false;
  formData.value.start = "";
  formData.value.end = "";
};

const clearConflict = () => {
  conflictMessage.value = "";
  formData.value.start = "";
  formData.value.end = "";
};

// Função do toast
const showToastNotification = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  toastProgress.value = 100;

  if (toastTimer) clearInterval(toastTimer);

  const duration = 3000;
  const interval = 30;
  const decrement = (interval / duration) * 100;

  toastTimer = setInterval(() => {
    toastProgress.value -= decrement;
    if (toastProgress.value <= 0) {
      closeToast();
    }
  }, interval);
};

const closeToast = () => {
  showToast.value = false;
  if (toastTimer) {
    clearInterval(toastTimer);
    toastTimer = null;
  }
};

// Dados do formulário
const formData = ref({
  responsibleName: "",
  title: "",
  rooms: "",
  date: "",
  start: "",
  end: "",
  eventType: "",
  participants: "",
  participantCount: "",
  notes: "",
  needsCoffee: false,
  coffee: {
    observation: "",
    type: "",
  },
});

// Data mínima (hoje)
const minDate = new Date().toISOString().split("T")[0];

// Lista de salas
const rooms = [
  "Sala Paixão",
  "Respeito",
  "Auditório F1",
  "Auditório F2",
  "Auditório F3",
  "Hoshin",
  "Sala ADM",
  "Sala RH",
  "Sala Manutenção",
  "Sala NIKE",
  "Sala do BIP",
  "Sala Compromisso",
];

// Tipos de evento
const eventTypes = [
  "Reunião de Equipe",
  "Apresentação para Cliente",
  "Apresentação",
  "Treinamento",
  "Reunião - A3",
  "Workshop",
  "Conferência",
  "Entrevista",
  "Sessão de Brainstorm",
  "Review de Projeto",
  "Planning",
  "Retrospectiva",
  "Demo de Produto",
  "Call com Fornecedor/Corporativo",
  "Reunião de Gerentes",
  "Leitura de Livro",
  "Outros",
];

// Tipos de participantes
const participantTypes = [
  "Colaboradores específicos",
  "Auxiliares",
  "Coordenadores",
  "Gerentes",
  "Áreas de Apoio",
  "Colaboradores",
  "Aprendizes",
  "Líderes e Coordenadores",
  "Mecânicos",
  "Processos Seletivos",
  "Visitas",
  "Workshops",
];

// Função para atualizar o colapsável
const toggleCoffeeBreak = () => {
  coffeeBreakExpanded.value = formData.value.needsCoffee;
};

const selectedEventType = computed(() => {
  if (formData.value.eventType) {
    return formData.value.eventType;
  }
  return "Selecione o tipo de evento";
});

const selectedParticipants = computed(() => {
  if (formData.value.participants) {
    return formData.value.participants;
  }
  return "Selecione os participantes";
});

const selectedRooms = computed(() => {
  if (formData.value.rooms) {
    return formData.value.rooms;
  }
  return "Selecione a sala";
});

// Estado de conflito
const conflictMessage = ref("");

// Validação do formulário
const isFormValid = computed(() => {
  return (
    formData.value.responsibleName.trim() !== "" &&
    formData.value.title.trim() !== "" &&
    formData.value.rooms !== "" &&
    formData.value.date !== "" &&
    formData.value.start !== "" &&
    formData.value.end !== "" &&
    formData.value.start < formData.value.end &&
    formData.value.participantCount !== ""
  );
});

// Classe computed do botão submit
const submitButtonClass = computed(() => {
  const base = "flex-1 group px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center text-sm";
  if (!isFormValid.value || !!conflictMessage.value) {
    return `${base} bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200`;
  }
  return `${base} bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border border-red-600 shadow-sm`;
});

// Verificar conflitos de horário
const checkConflicts = () => {
  if (!formData.value.rooms || !formData.value.date || !formData.value.start || !formData.value.end) {
    conflictMessage.value = "";
    return;
  }

  const existingBookings = JSON.parse(localStorage.getItem("reservas_salas") || "[]");

  const verificaSala = (reserva) => reserva.sala === formData.value.rooms;
  const verificaData = (reserva) => reserva.data === formData.value.date;
  const verificaHoraInicio = (reserva) =>
    formData.value.start >= reserva.horaInicio && formData.value.start < reserva.horaFinal;
  const verificaHoraFinal = (reserva) =>
    formData.value.end > reserva.horaInicio && formData.value.end <= reserva.horaFinal;

  const conflicts = existingBookings.filter((reserva) => {
    if (verificaSala(reserva)) {
      if (verificaData(reserva)) {
        if (verificaHoraInicio(reserva) || verificaHoraFinal(reserva)) {
          return true;
        }
      }
    }
    return false;
  });

  if (conflicts.length > 0) {
    showConflictModal.value = true;
    const conflict = conflicts[0];
    conflictMessage.value = `A sala "${formData.value.rooms}" já está reservada das ${conflict.horaInicio} às ${conflict.horaFinal} para "${conflict.tipoevento}"`;
    formData.value.start = "";
    formData.value.end = "";
  } else {
    conflictMessage.value = "";
  }
};

// Watch para verificar conflitos
watch(
  [() => formData.value.rooms, () => formData.value.date, () => formData.value.start, () => formData.value.end],
  () => {
    checkConflicts();
  },
);

// Submissão do formulário
const handleSubmit = () => {
  if (!isFormValid.value || conflictMessage.value) {
    errorMessage.value = "Por favor, preencha todos os campos obrigatórios corretamente.";
    showErrorModal.value = true;
    return;
  }

  if (!formData.value.participantCount || formData.value.participantCount <= 0) {
    errorMessage.value = "O número de participantes deve ser maior que zero!";
    showErrorModal.value = true;
    return;
  }

  const reservaData = {
    id: Date.now(),
    sala: formData.value.rooms,
    responsavel: formData.value.responsibleName,
    tipoevento: formData.value.eventType || "",
    data: formData.value.date,
    horaInicio: formData.value.start,
    horaFinal: formData.value.end,
    participantes: formData.value.participants || "",
    quantidade: formData.value.participantCount,
    observacoes: formData.value.notes,
    cafe: formData.value.needsCoffee,
    cafeDetalhes: formData.value.needsCoffee ? formData.value.coffee : {},
    ...(formData.value.needsCoffee && { coffeeStatus: "solicitado" }),
  };

  const reservasExistentes = JSON.parse(localStorage.getItem("reservas_salas") || "[]");
  reservasExistentes.push(reservaData);
  localStorage.setItem("reservas_salas", JSON.stringify(reservasExistentes));

  showSuccessModal.value = true;

  formData.value = {
    responsibleName: "",
    title: "",
    rooms: "",
    date: "",
    start: "",
    end: "",
    eventType: "",
    participants: "",
    participantCount: "",
    notes: "",
    needsCoffee: false,
    coffee: {
      observation: "",
      type: "",
    },
  };

  window.dispatchEvent(new CustomEvent("reserva-adicionada"));
  emit("reserva-criada", reservaData);
};
</script>

<style scoped>
/* Personalização dos radio buttons */
input[type="radio"]:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

/* Gradiente no botão principal */
.gradient-button {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
}

.gradient-button:hover {
  background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%);
}

/* Responsividade adicional */
@media (max-height: 800px) {
  .min-h-screen {
    min-height: auto;
  }
}

/* Animações dos modais */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: scale(0.95) translateY(10px);
}

/* Animações do toast */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Animação de shake (mantido para uso futuro em validação inline) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
